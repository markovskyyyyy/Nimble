import { useNimbleData } from "./hooks/useData"
import { JobCard } from "./components/JobCard"

function App() {
const email = "marcos.011@live.com"
const {candidate, jobs, loading, error } = useNimbleData(email)


return (
  <div className="min-h-screen bg-zinc-950 p-8">
    <div className="max-w-4xl mx-auto">
      <header className="mb-10 text-left">
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">Nimble</h1>
        <p className="text-zinc-400 "> postulacion para jr fullstack dev</p>
      </header>
      {loading && (
        <div className="text-center text-blue-600 font-medium animate-pulse ">
          cargando...
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-800 p-4 border border-red-300">
          <strong > Error: </strong> {error}
        </div>
      )}
      {!loading && !error && candidate && (
        <div>
          <div className="bg-zinc-900 p-4 mb-8 border border-zinc-800">
            <p className="text-zinc-300 "> hola, <strong>{candidate.firstName} {candidate.lastName} </strong>! selecciona una posicion para aplicar:   </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map( (job) => (
              <JobCard key={job.id} job={job} candidate={candidate} />
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
)
}
export default App
