const adjectives = ["Brave", "Silent", "Quick", "Smart", "Shy", "Curious", "Tall"];
const nouns = ["Fox", "Otter", "Panther", "Turtle", "Falcon", "Badger", "Dog", "Cat"];

const GenerateDeviceName = () => {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adj}${noun}`;
}

export default GenerateDeviceName