// I have been playing a lot of Planet Zoo, lets now create a virtual zoo

//Making a new Animal
class Animal {
    constructor (name, gender) {
        this.name = name;
        this.gender = gender;
    }

    describe() {
        return `${this.name} is a ${this.gender}.`;
    }    
}

//Making a new Habitat
class Habitat {
    constructor (name) {
        this.name = name;
        this.animals = [];
    }

    addAnimal(animal){
        if (animal instanceof Animal) {
            this.animals.push(animal);
        } else {
            throw new Error(`You can only add an instance of Animal. Argument is not an Animal : ${animal}`);
        }
    }
//I followed the Menu App video for this assignment however this line of code never shows up while running. Unsure of its use but still included it for fear of ruining any other code
    describe() {
        return `${this.name} has ${this.animals.length} animals.`;
    }
}

// Creating the Main Menu
class Menu {
    constructor() {
        this.habitats = [];
        this.selectedhabitats = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection !=0) {
            switch (selection) {
                case `1`:
                    this.createHabitat();
                    break;
                case `2`:
                    this.viewHabitat();
                     break;
                case `3`:
                    this.deleteHabitat();
                    break;
                case `4`:
                    this.displayHabitats();
                    break;
                default:
                    selection = 0;                 
            }
            selection = this.showMainMenuOptions();
        }

        alert(`Thanks for visiting the Zoo!`);
    }
//Main Menu Options
    showMainMenuOptions() {
        return prompt(`
        -----Welcome to the Zoo-----

        0) Exit Zoo
        1) Create a New Habitat
        2) View a Habitat
        3) Destroy a Habitat
        4) Display all Habitats
        `);
    }
//Selected Habitat Options
    showHabitatMenuOptions (habitatInfo) {
        return prompt(`
        0) Back
        1) Add a new animal for this Habitat
        2) Release an animal from this Habitat into the wild
        ---------------------
        ${habitatInfo}
        `);
    }

    displayHabitats() {
        let habitatString = '';
        for (let i = 0; i < this.habitats.length; i++) {
            habitatString += i + ') ' + this.habitats[i].name + '\n';
        }
        alert(habitatString);
    }

    createHabitat() {
        let name = prompt('What kind of animal habitat would you like to create?');
        this.habitats.push(new Habitat(name));
    }

    viewHabitat() {
        let index = prompt('Enter the index of the Zoo Habitat you wish to view:');
        if (index > -1 && index < this.habitats.length) {
          this.selectedHabitat = this.habitats[index];  
          let description = 'Zoo Habitat: ' + this.selectedHabitat.name + '\n';

          for(let i = 0; i < this.selectedHabitat.animals.length; i++) {
              description += i + ') ' + this.selectedHabitat.animals[i].name 
              + ' - ' + this.selectedHabitat.animals[i].gender + '\n';  
          }

          let selection = this.showHabitatMenuOptions(description);
          switch (selection) {
            case '1':
                this.createAnimal();
                break;
            case '2':
                this.deleteAnimal();
          }
        }
    }

    deleteHabitat() {
        let index = prompt('Enter the index of the Zoo Habitat you wish to destroy:');
        if (index > -1 && index < this.habitats.length) {
            this.habitats.splice(index, 1);
        }
    }

    createAnimal() {
        let name = prompt('Enter name for new Animal:');
        let gender = prompt('Enter gender of the new Animal:');
        this.selectedHabitat.animals.push(new Animal(name, gender));
    }

    deleteAnimal(){
        let index = prompt('Enter the index of the animal you wish to release from zoo:');
        if (index > -1 && index < this.selectedHabitat.animals.length) {
            this.selectedHabitat.animals.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();

