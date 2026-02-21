import { useState } from "react";
import type {Job,Candidate} from "../types/types"
import { applyToJob } from "../api/api";



interface JobCardProps {
    job: Job;
    candidate: Candidate;
}

export const JobCard = ({job, candidate }: JobCardProps ) => {
    const [repoUrl, setRepoUrl] = useState('')
    const [status, setStatus] = useState<'idle' | "loading" | "success" | 'error'>('idle')
    const [message, setMesage] = useState('')

    const handleSubmit = async () => {
        if(!repoUrl){
            setStatus('error')
            setMesage('ingresa la url de tu repositorio ')
            return 
        }

        try{
            setStatus('loading')
            await applyToJob({
                uuid: candidate.uuid,
                candidateId: candidate.candidateId,
                applicationId: candidate.applicationId,
                jobId: job.id,
                repoUrl: repoUrl
            })

            setStatus('success')
            setMesage("postulacion enviada")

        }catch (err){
            setStatus("error")
            setMesage(err instanceof Error ? err.message : "error al enviar la postulacion")
        }

        
    }

    return (
        <div className="bg-zinc-900 p-6 shadow-md border border-zinc-800 flex flex-col gap-4 ">
            <h3 className="text-xl font-bold text-zinc-100 "> {job.title}</h3>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400 "> URL Repositorio: </label>
                <input type="url" placeholder="https://github.com/usuario/repo" value={repoUrl} onChange={(e ) => setRepoUrl(e.target.value)} disabled={status === 'loading' || status === 'success' }
                className=" px-3 py-2 border-zinc-700 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-950"/>
            </div>
            <button 
            onClick={handleSubmit}
            disabled={status === 'loading' || status === "success"}
            className="bg-indigo-600 text-white py-2 px-4 font-medium hover:bg-indigo-700 transition-colors disabled:bg-zinc-800"
            >{status === 'loading' ? 'Enviando...' : status === 'success' ? 'Correctamente enviado' : 'Submit'}</button>
            {message &&(
                <p className={`text-sm mt-2 ${status === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>{message}</p>
            )}
        </div>
    )
}