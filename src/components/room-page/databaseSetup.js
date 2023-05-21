import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, update} from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBvfOpgYeasmMuFl_cNFf8NZUhZ6yBsD3Q",
    authDomain: "sidecar-402a5.firebaseapp.com",
    databaseURL: "https://sidecar-402a5-default-rtdb.firebaseio.com",
    projectId: "sidecar-402a5",
    storageBucket: "sidecar-402a5.appspot.com",
    messagingSenderId: "945779284465",
    appId: "1:945779284465:web:dec398402a320216cdcc50",
    measurementId: "G-NZS4NHGYMH"
};

const createApp = () => {return initializeApp(firebaseConfig)}
export const createDatabase = () => {return  getDatabase (createApp())}

export const getDate = () => { 
    let date_ob = new Date();

    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    
    return (year + "-" + month + "-" + date);
}

const randomName = () => {
    const animals = [
      "dog", "cat", "elephant", "lion", "tiger", "giraffe", "monkey", "zebra", "kangaroo", "hippo",
      "penguin", "crocodile", "bear", "wolf", "deer", "fox", "rabbit", "koala", "owl", "snake",
      "shark", "dolphin", "turtle", "whale", "sparrow", "hawk", "eagle", "peacock", "parrot",
      "rhinoceros", "cheetah", "panda", "octopus", "jaguar", "panther", "camel", "gorilla", "seal",
      "lizard", "chimpanzee", "sloth", "hedgehog", "gazelle", "lobster", "crab", "starfish", "snail",
      "antelope", "buffalo", "cow", "horse", "sheep", "goat", "pig", "chicken", "duck", "turkey",
      "ostrich", "peacock", "bee", "butterfly", "spider", "scorpion", "polar bear", "penguin",
      "raccoon", "skunk", "mouse", "rat", "hamster", "gerbil", "guinea pig", "parakeet", "goldfish",
      "dolphin", "whale", "seagull", "pelican", "flamingo", "swan", "kangaroo", "koala", "wombat",
      "platypus", "dingo", "kiwi", "emu", "wallaby", "toucan", "chameleon", "elephant seal",
      "blue whale", "great white shark", "giant squid", "orca", "swordfish", "jellyfish", "crab",
      "lobster", "starfish", "coral", "anglerfish"
      // Add more animals here if needed
    ];
    
    const colors = [
      "red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "gray", "black",
      "white", "cyan", "magenta", "lime", "teal", "maroon", "navy", "olive", "silver", "gold",
      "indigo", "violet", "turquoise", "coral", "salmon", "peru", "sienna", "crimson", "khaki",
      "orchid", "lavender", "plum", "slate gray", "aquamarine", "chartreuse", "chocolate", "firebrick",
      "forest green", "hot pink", "midnight blue", "sandy brown", "seashell", "thistle", "tomato",
      "wheat", "steel blue", "powder blue", "peach", "pale green", "navajo white", "moccasin", "misty rose",
      "linen", "lemon chiffon", "ivory", "honeydew", "gainsboro", "floral white", "dark slate gray", "dark olive green",
      "dark khaki", "dark goldenrod", "dark cyan", "dark blue", "cornsilk", "bisque", "beige", "antique white",
      "alice blue", "azure", "blanched almond", "burlywood", "cadet blue", "chartreuse", "cornflower blue",
      "dark gray", "dark green", "dark magenta", "dark orange", "dark orchid", "dark red", "dark salmon",
      "dark sea green", "dark turquoise", "dark violet", "deep pink", "deep sky blue", "dim gray", "dodger blue",
      "firebrick", "floral white", "forest green", "fuchsia", "gainsboro", "ghost white", "gold", "goldenrod",
      // Add more colors here if needed
    ];
    
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    
      return randomColor + " " + randomAnimal;
}
    

export const generateName = () => {
    // check user's local cache storage for name. If it exists, use it. If it doesn't, generate a new one.
    
    if (localStorage?.getItem("sidecar_username"))
    {
        // Name exists
        console.log(localStorage.getItem("sidecar_username"));
        return localStorage.getItem("sidecar_username");
    }

    const name = randomName();
    localStorage.setItem("sidecar_username", name);
    return name;
}

