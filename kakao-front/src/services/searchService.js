import getConstantVowels from "./createHangulString";

const searchServiceToFriend = (data, search) => {
    const searchArr = getConstantVowels(search.value.replace(/\s/g, ""))

    return data.filter(user => {
        const name = getConstantVowels(user.name)

        const consonantVowelName = name.join('').replace(/\s/g, "")
        const consonantVowelSearch = searchArr.join('').replace(/\s/g, "")

        const consonantName = name.map(name => name[0]).join('').replace(/\s/g, "")
        const consonantSearch = searchArr.map(search => search[0]).join('').replace(/\s/g, "")

        return (consonantName.includes(consonantSearch) && consonantSearch === consonantVowelSearch)|| consonantVowelName.includes(consonantVowelSearch)
    })
}

export default searchServiceToFriend