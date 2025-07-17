const adjectives = ["Brave", "Silent", "Quick", "Smart", "Shy", "Curious", "Tall"];
const nouns = ["Fox", "Otter", "Panther", "Turtle", "Falcon", "Badger", "Dog", "Cat"];

export function GenerateDeviceName() {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const randint = Math.floor(Math.floor(Math.random() * 1000))
    
    return `${adj}${noun}${randint}`;
}