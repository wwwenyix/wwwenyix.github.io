<template>
  <Experiment title="Mental Rotation">
    <InstructionScreen :title="'Welcome'">
      Hello World! How have <b>you</b> been?
    </InstructionScreen>

    <template v-for="(trial, i) in trialsTrain">
      <KeypressScreen 
        question="Same or different?" 
        :keys="key_allocation"
        :fixationTime="sample([250,300,1000])"
        :responseTimeLimit="3000"
        :feedbackTime="1000"
        >
        <template #stimulus>
          <img :src="trial.picture" />
          <Record :data="{
              'trial_nr'   : i+1,
              'angle'      : trial.angle,
              'expected'   : trial.expected,
              'item'       : trial.item,
              'trial_type' : 'training'
            }" />
        </template>
        <template #feedback>
        <p v-if="$magpie.measurements.responseTimeout == true">Please respond faster.
        </p>
        <p v-else-if="$magpie.measurements.response === trial.expected">Correct</p>
        <p v-else>Incorrect</p>
       </template>
      </KeypressScreen>
    </template>

    <SubmitResultsScreen />
  </Experiment>
</template>

<script>
import _ from 'lodash';
import trialsMain from '../trials/mr_main_trials.csv';
import trialsTrain from '../trials/mr_training_trials.csv';

var same_key = _.sample(['j','f'])
var key_allocation = same_key == 'f' ? {'f': 'same', 'j': 'different'} : {'f': 'different', 'j': 'same'} ;

export default {
  name: 'App',
  data() {
    return {
      trialsMain: trialsMain, 
      trialsTrain: trialsTrain,
      // trialsTrain: _.shuffle(_.slice(trialsTrain,0,2)), 
      key_allocation: key_allocation, 
      same_key: same_key, 
      sample: _.sample};
  },
  computed: {
    // Expose lodash to template code
    _() {
      return _;
    }
  },
  mounted() {
    this.$magpie.addExpData({
      same_key : same_key
    });
  }
};
</script>
