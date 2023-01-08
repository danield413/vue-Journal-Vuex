//pueden ser acciones asincronas que pueden llamar a mutaciones

import journalApi from "@/api/journalApi"

export const loadEntries = async ({ commit }) => {
    
    const { data } = await journalApi.get("/entries.json")

    if(!data) {
        commit("setEntries", [])
        return
    }

    const entries = []
    for (let id of Object.keys(data)) {
        entries.push({
            id,
            ...data[id]
        })
    }
   
    commit("setEntries", entries)
}

export const updateEntry = async ({ commit }, entry) => {
    const { id, ...rest } = entry
    const dataToSave = rest
    await journalApi.put(`/entries/${id}.json`, dataToSave)
    commit("updateEntry", {...entry})
}

export const createEntry = async ({ commit }, entry) => {

    const { text, picture, date } = entry
    const dataToSave = { date, text, picture }

    const { data } = await journalApi.post("/entries.json", dataToSave)

    dataToSave.id = data.name

    commit("addEntry", dataToSave)

    return dataToSave.id
}

export const deleteEntry = async ({ commit }, id) => {

    await journalApi.delete(`/entries/${id}.json`)

    commit("deleteEntry", id)

}