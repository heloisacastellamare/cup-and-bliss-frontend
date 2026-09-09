import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function MainLayout(){
    return (
        <div className="min-h-screen bg-off-white">
            <Navbar />

            <main className="pt-16 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <Outlet />
            </main>
        </div>
    )
}