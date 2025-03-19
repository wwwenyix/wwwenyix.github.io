// enter the game
function startGame() {
    goToScene("scene1");
}

// 切换场景
function goToScene(sceneId) {
    console.log("Trying to access scene: " + sceneId);
    const scene = document.getElementById(sceneId);
    if (scene) {
        scene.classList.remove('hidden');
    } else {
        console.error("Element with ID '" + sceneId + "' not found.");
    }
}

// 初始化游戏
document.addEventListener("DOMContentLoaded", () => {
    goToScene("start-screen"); // 确保游戏从开始界面启动
});

// 初始化智慧和力量（如果 sessionStorage 没有值）
if (sessionStorage.getItem('wisdom') === null) {
    sessionStorage.setItem('wisdom', 5);
}
if (sessionStorage.getItem('strength') === null) {
    sessionStorage.setItem('strength', 5);
}

// 更新状态栏
function updateStatus() {
    const wisdom = sessionStorage.getItem('wisdom');
    const strength = sessionStorage.getItem('strength');
    const wisdomElement = document.getElementById('wisdom');
    const strengthElement = document.getElementById('strength');

    if (wisdomElement) wisdomElement.textContent = wisdom;
    if (strengthElement) strengthElement.textContent = strength;
}

// 增加智慧
function increaseWisdom(points) {
    let current = parseInt(sessionStorage.getItem('wisdom'));
    sessionStorage.setItem('wisdom', current + points);
    updateStatus();
}

// 增加力量
function increaseStrength(points) {
    let current = parseInt(sessionStorage.getItem('strength'));
    sessionStorage.setItem('strength', current + points);
    updateStatus();
}

// 答题专用
//TODO: 这里需要改一下 防止用户返回后重复进入同一页面刷分
//TODO: maybe better to have a constructor here
let quizSubmitted = false;
function checkAnswer(answer, correctAnswer, type) {
    const resultMessage = document.getElementById('result-message');

    if (quizSubmitted) {
        resultMessage.textContent = "You've already answered it! Please go back to the room."
        return;
    } // 防止重复提交

    if (answer === correctAnswer) {
        if (type === 'wisdom'){
            increaseWisdom(2); // 答对加2点智慧
            resultMessage.textContent = "Correct! You've gained 2 wisdom points. Now go back to the room.";
        }
        if (type === 'strength'){
            increaseStrength(2);
            resultMessage.textContent = "Correct! You've gained 2 strength points. Now go back to the room."
        }
    } else {
        resultMessage.textContent = "Oops! That's incorrect."
    }

    quizSubmitted = true; // 标记已提交，防止刷分
}

window.onload = updateStatus;

function checkFinalChallenge() {
    const resultMessage = document.getElementById('result-message');

    const strength = parseInt(sessionStorage.getItem('strength'));
    const wisdom = parseInt(sessionStorage.getItem('wisdom'));

    if (strength >= 8 || wisdom >= 8) {
        if (strength > wisdom) {
            window.location.href = "./final-challenge/strength.html";
        } else {
            window.location.href = "./final-challenge/wisdom.html";
        }
    } else {
        resultMessage.textContent = "Your strength or wisdom is not enough to open the door. Keep working hard!";
    }
}

function resetGame() {
    sessionStorage.removeItem('wisdom');
    sessionStorage.removeItem('strength');
    sessionStorage.setItem('wisdom', 5);
    sessionStorage.setItem('strength', 5);
    updateStatus();
    window.location.href = "index.html";
}