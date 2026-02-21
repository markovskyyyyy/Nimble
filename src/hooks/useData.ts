import { useState, useEffect } from "react";
import { getCandidateData, getJobsList } from "../api/api";
import type { Candidate, Job } from "../types/types";

export const useNimbleData = (email: string) => {
    const [candidate, setCandidate] = useState<Candidate | null> (null)
    const [jobs, setJobs] = useState<Job[]>([])
    const [loading, setLoading] = useState<Boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(()=>{
        const fetchData = async () => {
            if (!email) return 

            try{
                setLoading(true)
                setError(null)
                const [candidateRes,jobsRes] = await Promise.all([
                    getCandidateData(email),
                    getJobsList()
                ])
                setCandidate(candidateRes)
                setJobs(jobsRes)
            }catch (err){
                setError(err instanceof Error ? err.message : "Error desconocido")
            }finally{
                setLoading(false)
            }
        }
        fetchData()
    }, [email])

    return { candidate, jobs, loading, error}
}