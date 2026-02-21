import type {Candidate, Job, ApplyPayload} from "../types/types"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getCandidateData = async (email: string): Promise <Candidate> => {
    const response = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${email}`)
    if (!response.ok){
        throw new Error("Error al obtener la lista de candidatos")
    }
    return response.json()
}


export const getJobsList = async (): Promise <Job[]> => {
    const response = await fetch(`${BASE_URL}/api/jobs/get-list`)
    if (!response.ok){
        throw new Error("Error al obtener la lista de trabajos")
    }
    return response.json()
}

export const applyToJob  = async ( payload: ApplyPayload): Promise<{ok: boolean}> => {
    const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if(!response.ok){
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || 'error al enviar la postulacion')
    }

    return response.json();
}


