# Setting up a Mental Rotation Experiment

## Basics

1. Follow the instructions on the [magpie manual](https://magpie-manual.netlify.app/) site to install magpie, initialize a new experiment with `magpie new mental-rotation`, built it and run it in your local browser.
2. Open the file `src/App.vue` in your favorite text editor. (Maybe install a vue.js mode for proper syntax highlighting, e.g., VS Code with the Volar extension.)
3. Change the title of the experiment to whatever you like it to be. Save the file and check in the browser whether this change is reflected anywhere. You should not have to reload necessarily.
4. Change the content of the "Welcome" screen to a welcome message of your liking (for your mental rotation experiment).
6. Copy-paste the example [KeypressScreen](https://magpie-reference.netlify.app/#keypressscreen) into your experiment. Remove the feedback component. Change the option for the keys to `:keys="{'f': 'same', 'j': 'different'}"`. At this stage you should see no pictures, but you can advance by pressing buttons f or j.
   - Later we will randomly allocate participants to key mapping but for now we keep it fixed and the same for everybody.
7. Create a new directory called `trials` in your experiment folder and place the files `mr_main_trials.csv` and `mr_training_trials.csv` in that directory `trials`. Import the information from these files into variables `main_trials` and `training_trials` in the file `src/App`.
8. Create a (nested) directory `public/images` and move the content of the directory `04-mental_rotation_images` from the ZIP file into the new `public/images` directory (keeping the sub-directory structure from the ZIP file's directory).
9. Read the instructions for [importing trial information](https://magpie-manual.netlify.app/01_designing_experiments/02_independent_variables/). Follow the instructions / examples from that part of the documentation to use the information in the `mr_training_trials.csv` to realize all 12 training trials with your KeypressScreen. This should result in an experiment with 12 training trials, each of which showing a different picture and allowing to proceed with a key press f or j.
9. Do the whole experiment until you get to the final 'results' screen. Pause to think: Which information is missing?
10. Check the information on adding trial-level information [here](https://magpie-manual.netlify.app/01_designing_experiments/01_custom_screens/#passing-variables-directly-to-the-results). Use the <Record> tag (inside the <template #stimulus> tag) in your experiment to record the information from each trial which will be necessary to analyze the data later on (angle, expected answer, item number). Finally, also add the trial type (`trail_type`) and the running index / number of the trial (`trail_number`).
11. Check the [information on trial randomization](https://magpie-manual.netlify.app/01_designing_experiments/02_independent_variables/#trial-randomization) to randomize all training trials on each round.
12. Check information on the [KeypressScreen](https://magpie-reference.netlify.app/#keypressscreen) to find out how to add a fixation cross to each training trial. Set a fixed 300ms fixation cross, or better, make each fixation time random (in a reasonable way). Maybe [lodash's sample function](https://lodash.com/docs/#sample) might help to write a custom sampling function like [here](https://magpie-manual.netlify.app/01_designing_experiments/02_independent_variables/#trial-randomization).
13. Add a pause screen that tells participants that the trial phase is over, then add the main trials.

## Advanced

1. Read about the [LifeCycle](https://magpie-manual.netlify.app/01_designing_experiments/00_built-in_screens/#life-cycle-phases) of built-in Screens. Check the information on the KeypressScreen to find out how to add a time-out of 7500 ms for each trial. After doing this you should see your trial simply disappear without any further information.
2. Insert more informative feedback, depending on whether the trial timed out, and if not, whether the answer was correct.
3. Currently the keys J and F are mapped onto responses ‘same’ and ‘different’ in the same way for each participant. Can you make the mapping conditional on a random choice? If you do, make sure to also record which key was mapped to the ‘same’ response (because that information might be interesting for exploratory data analysis). For the latter, check how to add to the global data store. Hint: you can also add global data directly when creating the Vue App, by adding this code to the ‘export default’ object in the JS script part of ‘App.vue’:
mounted() { this.$magpie.addExpData({
same_key : same_key });
}



