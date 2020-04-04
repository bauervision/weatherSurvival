const storyLines = [
    'Pandemic Escape', 'Airplane Crash', 'Lost on Vacation'
]

export const GenerateStoryLine = () => {
    return storyLines[Math.floor(Math.random() * storyLines.length)]
}