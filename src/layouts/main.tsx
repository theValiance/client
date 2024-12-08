import { Link, Outlet } from "react-router-dom";

export function Component() {
	return (
		<div className="p-1 md:p-3 lg:p-5">
			<div className='fixed z-40 top-3 left-3 md:top-5 md:left-5 drop-shadow-xl rounded-xl bg-slate-800 w-fit p-3'>
				<Link to='/home'>
					<h1 className='sm:text-lg md:text-xl lg:text-2xl text-sky-300'>Songrater</h1>
				</Link>
			</div>
			<Outlet />
		</div>
	)
}