'AllergenesList': function ()
  {
    this.emit(':tell', `You are allergic to`);
  },
'AllergenesAdd': function () {
      const Allergene = this.event.request.intent.slots.Allergene.value;
      this.emit(':tell', `You sucessfully added ${Allergene} to your list of Allergenes`);
    },
  'AllergenesDelete': function () {
        const Allergene = this.event.request.intent.slots.Allergene.value;
        this.emit(':tell', `You sucessfully deleted ${Allergene} from your list of Allergenes`);
  },
  'AllergicTo': function () {
        const Allergene = this.event.request.intent.slots.Allergene.value;
        If() 
        {
        this.emit(':tell', `You are currently allergic to ${Allergene}`);
        }
        else {
          this.emit(':tell', `You are currently not allergic to ${Allergene}`);
        }
  },
  'FoodQuery': function () {
        const Food = this.event.request.intent.slots.Food.value;
        If()
        {
        this.emit(':tell', `You are not able to ${Food}, because you are allergic to`);
        }
        else {
          this.emit(':tell', `${Food} doesn't contain any of your Allergenes. It is safe to eat.`);
        }
  },
  'WhatAllergenes': function () {
        const Food = this.event.request.intent.slots.Food.value;
        this.emit(':tell', `${Food} contains following Allergenes `);
      },
  'IsIn': function () {
            const Allergene = this.event.request.intent.slots.Allergene.value;
            const Food = this.event.request.intent.slots.Food.value;
            If()
            {
            this.emit(':tell', `${Food} contains ${Allergene}`);
            }
            else {
              this.emit(':tell', `${Food} is free of ${Allergene}. It is safe to eat.`);
            }
          },
