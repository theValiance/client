import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form";
import { IPostEntryParams, useUpdateEntry } from "../api/post-entry";
import { useCountEntries } from "../api/count-entries";
import css from './rate.module.css';

export function Component() {
	const { vid } = useParams();
	const countQuery = useCountEntries({ vid })
	const {
		register,
		handleSubmit,
		//formState: { errors },
	} = useForm<IPostEntryParams>({defaultValues: {
		vid,
		labels: {
			set: 'A',
			energy: 0.5,
			sharpness: 0.5,
			mood: 0.5,
			color: 0.5,
		},
	}});
	const postEntry = useUpdateEntry(vid!);
	const nav = useNavigate();
	const onSubmit = async (data: IPostEntryParams) => {
		if (!postEntry.isPending) {
			await postEntry.mutateAsync(data);
			if (!postEntry.isError) {
				nav('/home');
			}
		}
	}

	return (<>
		<Helmet>
			<title>Rate a song</title>
		</Helmet>

		<form id="form" onSubmit={handleSubmit(onSubmit)} />
		<input form="form" type='hidden' {...register('vid')} />
		<input form="form" type='hidden' {...register('labels.set')} />

		
		<div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 min-h-100">
			<h1 className="md:col-span-2 text-center text-2xl">New Rating</h1>
			<h2 className="md:col-span-2 text-center">This song has been rated {countQuery.data?.count} times</h2>
			<iframe className="w-full aspect-video" src={`https://www.youtube.com/embed/${vid!}?feature=oembed`} referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
			<div className="flex flex-col">
				<div className="grow grid grid-rows-4">
					<div className="flex flex-col">
						<label htmlFor="energyInp">Energy:</label>
						<input className={`${css.slider} bg-gradient-to-r from-yellow-300 to-green-500`} id="energyInp" form="form" type="range" step="0.001" min="0" max="1" {...register('labels.energy')} />
						<div className="flex flex-row place-content-between">
							<p>Low</p>
							<p>High</p>
						</div>
					</div>
					<div className="flex flex-col">
						<label htmlFor="sharpnessInp">Sharpness:</label>
						<input className={`${css.slider} bg-gradient-to-r from-pink-300 to-indigo-700`} id="sharpnessInp" form="form" type="range" step="0.001" min="0" max="1" {...register('labels.sharpness')} />
						<div className="flex flex-row place-content-between">
							<p>Soft</p>
							<p>Sharp</p>
						</div>
					</div>
					<div className="flex flex-col">
						<label htmlFor="moodInp">Mood:</label>
						<input className={`${css.slider} bg-gradient-to-r from-black to-white`} id="moodInp" form="form" type="range" step="0.001" min="0" max="1" {...register('labels.mood')} />
						<div className="flex flex-row place-content-between">
							<p>Negative</p>
							<p>Positive</p>
						</div>
					</div>
					<div className="flex flex-col">
						<label htmlFor="colorInp">Color:</label>
						<input className={`${css.huebg} ${css.slider}`} id="colorInp" form="form" type="range" step="0.001" min="0" max="1" {...register('labels.color')} />
					</div>
				</div>
				<div className="grid grid-cols-2 gap-x-5">
					<label className="col-span-2" htmlFor="nameInp">Name:</label>
					<input 
						form="form" 
						type="text"
						className="border p-2"
						id="nameInp"
						placeholder="Enter a name..."
						{...register('name', {
							minLength: {
								value: 3,
								message: 'Name must be at least 3 characters long.',
							}
						})} 
					/>
					<button className="border rounded-3xl bg-green-400 drop-shadow-md" form="form" type='submit'>Submit!</button>
				</div>
			</div>
		</div>
	</>);
}