'use strict';

function trackDosage(medicationName, initialDosage) {
   return {
   
    getInstructions() {
        console.log(`Take ${initialDosage} of ${medicationName}`);
        return this;
    },

    adjustDosage(doctorPin, newDosage){
        if(doctorPin !== 1234 || newDosage <= 0) {
           throw new Error('Invalid doctor pin or dosage');
        }
         initialDosage = newDosage;
        return this;
    }

   }
}

const dosageTracker = trackDosage('Aspirin', 100);
dosageTracker.getInstructions();
dosageTracker.adjustDosage(1234, 150).getInstructions();

// dosageTracker.adjustDosage(1111, 200).getInstructions();
dosageTracker.adjustDosage(1234, -50).getInstructions();