'AllergensList': function ()
  {
    const ref = db.ref(`allergies/${userId}`)
    ref.once("value", (snapshot) => {
        const allergies = snapshot.val()
        this.emit(':tell', `You have allergies to: ${naturalJoin(allergies)}`)
    });
  },
'AllergensAdd': function () {
      const Allergene = this.event.request.intent.slots.Allergene.value;
      this.emit(':tell', `You sucessfully added ${Allergene} to your list of Allergens`);
    },
  'AllergensDelete': function () {
        const Allergene = this.event.request.intent.slots.Allergene.value;
        this.emit(':tell', `You sucessfully deleted ${Allergene} from your list of Allergens`);
  },
  'AllergicTo': function () {
        const allergen = this.event.request.intent.slots.Allergen.value;
        const ref = db.ref(`allergies/${userId}`)
        ref.once("value", (snapshot) => {
            const allergies = snapshot.val()
            If(allergies.indexOf(allergen)>=0)
            {
            this.emit(':tell', `You are currently allergic to ${allergen}`);
            }
            else {
              this.emit(':tell', `You are currently not allergic to ${allergen}`);
            }
        });

  },
  'FoodQuery': function () {
        const Food = this.event.request.intent.slots.Food.value;
        const ref = db.ref(`allergies/${userId}`)
        ref.once("value", (snapshot) => {
            const allergies = snapshot.val()
            foodapi.makeSession(() => {
              foodapi.search(food, (upc) => {
                foodapi.getAllergens(upc, (allergens) => {
                  const bad = allergens.red
                  const allergenList = naturalJoin(bad);
                  let eatable = 0;
                  for(i=0;i<allergies.length();i++)
                  {
                    if(bad.indexOf(allergies[i])>=0)
                    {
                      eatable = 1;
                      break;
                    }
                  }
                  If(eatable==1)
                  {
                  this.emit(':tell', `You are not able to eat ${Food}`);
                  }
                  else {
                    this.emit(':tell', `${Food} doesn't contain any of your Allergens. It is probably safe to eat.`);
                  }
                })
              })
            })
        });

  },
  'WhatAllergens': function () {
        const food = this.event.request.intent.slots.Food.value;
        foodapi.makeSession(() => {
          foodapi.search(food, (upc) => {
            foodapi.getAllergens(upc, (allergens) => {
              const bad = allergens.red
              const allergenList = naturalJoin(bad);
              const minor = allergens.yellow
              const minorAllergenList = naturalJoin(minor);
              if (bad.length()>=1 && minor.length()>=1) {
                  this.emit(':tell', `${food} contains ${allergenList} and traces of ${minorAllergenList}`);
              }
              else if (bad.length()>=1 ) {
                  this.emit(':tell', `${food} contains ${allergenList}`);
              }
              else if (bad.length()==0 ) {
                this.emit(':tell', `${food} contains traces of ${minorAllergenList}`);
              }
              else {
                this.emit(':tell', `${food} is free of allergens`);
              }
            })
          })
        })
      },
  'IsIn': function () {
            const allergen = this.event.request.intent.slots.Allergen.value;
            const food = this.event.request.intent.slots.Food.value;
            foodapi.makeSession(() => {
              foodapi.search(food, (upc) => {
                foodapi.getAllergens(upc, (allergens) => {
                  const bad = allergens.red
                  const minor = allergens.yellow
                  If(bad.indexOf(allergene>=0))
                  {
                  this.emit(':tell', `${Food} contains ${Allergene}`);
                  }
                  else if (minor.indexOf(allergene)>=0) {
                      this.emit(':tell', `${Food} contains traces of ${Allergene}`);
                  }
                  else {
                    this.emit(':tell', `${Food} is free of ${Allergene}. It is safe to eat.`);
                  }
                })
              })
            })
        },
