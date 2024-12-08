import { Link, Outlet } from "react-router-dom";


export function Component() {
	return (
		<div className="p-5">
			<div className='fixed top-5 left-5 rounded-xl bg-slate-800 w-fit p-3'>
				<Link to='/home'><h1 className='text-2xl text-sky-300'>Songrater</h1></Link>
			</div>
			<Outlet />
		</div>
	)
}