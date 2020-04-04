// city codes for intial region selections
const regions = [
    { city: 'Tumbes', code: '3691148' },
    { city: 'Gallegos', code: '3838859' },
    { city: 'Kitimat', code: '5993072' },
    { city: 'Eastport', code: '5116149' },
    { city: 'Woodward', code: '4556050' },
    { city: 'Lae', code: '2092740' },
    { city: 'Stockholm', code: '2673730' }
]

export const GenerateRegion = () => {
    return regions[Math.floor(Math.random() * regions.length)]
}