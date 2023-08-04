import LoggedInContainer from '../containers/LoggedInContainer';
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import TextInput from '../components/TextInput';
import { useState, useRef, useEffect } from 'react';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelper';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import ClipboardJS from 'clipboard';
// import { Link, animateScroll as scroll } from "react-scroll";
import { Card, Typography } from '@material-tailwind/react';
import { jobData } from './JobDetails';

const Jobid = () => {
	const [collegeName, setCollegeName] = useState('');
	const [collegeList, setCollegeList] = useState([]);
	const [gradePoint, setGradePoint] = useState('');
	const [resumeLink, setResumeLink] = useState('');
	const [cookie, setCookie] = useCookies(['token']);
	const [instituteNames, setInstituteNames] = useState([]);
	const [selectedInstitute, setSelectedInstitute] = useState('');

	const navigate = useNavigate();

	const job_id = useParams().jobid;
	const url = window.location.href;

	const [copySuccess, setCopySuccess] = useState('');
	const textAreaRef = useRef(null);

	async function copyToClip() {
		await navigator.clipboard.writeText(url);
		setCopySuccess('Copied');
	}

	useEffect(() => {
		// Fetch data from the API and update the collegeList state
		axios
			.get('http://localhost:8080/institutenames/institutes')
			.then((response) => {
				setCollegeList(response.data);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}, []);

	const applyPosition = async () => {
		if (!collegeName || !gradePoint || !resumeLink) {
			alert('All the fields are required. Please check again');
			return;
		}

		const jobId = window.location.pathname.split('/').pop(); // Assuming the URL format is like http://localhost:3000/jobs/4324

		const data = { collegeName, gradePoint, resumeLink, jobId };
		console.log('Data to be posted:', data); // Add this line to check if data is correct
		const response = await makeUnauthenticatedPOSTRequest(
			'/auth/registerjob',
			data
		);
		if (response && !response.err) {
			const token = response.token;
			const date = new Date();
			date.setDate(date.getDate() + 30);
			setCookie('token', token, { path: '/', expires: date });
			setCookie('username', response.username, { path: '/', expires: date });
			alert('Success');
			navigate('/home');
		} else {
			alert('Failure');
		}
	};

	return (
		<LoggedInContainer curActiveScreen='home'>
			<div className='flex flex-row'>
				<div className='w-3/5 h-full bg-color11 ml-10 mr-16 p-5 rounded-xl text-white'>
					<div className='flex items-center'>
						<div className='text-4xl font-semibold mt-3 tracking-wide '>
							Senior Software Engineer
						</div>
					</div>
					<div className='my-3 italic text-color12'>(Job ID : {job_id})</div>
					<div>
						<div className='font-medium mt-8 text-2xl tracking-wide '>Job Description</div>
						<div className='mt-4 w-auto font-light text-color12 text-justify'>
							Drives the execution of multiple business plans and projects by
							identifying customer and operational needs; developing and
							communicating business plans and priorities; removing barriers and
							obstacles that impact performance; providing resources;
							identifying performance standards; measuring progress and
							adjusting performance accordingly; developing contingency plans;
							and demonstrating adaptability and supporting continuous learning.
							Provides supervision and development opportunities for associates
							by selecting and training; mentoring; assigning duties; building a
							team-based work environment; establishing performance expectations
							and conducting regular performance evaluations; providing
							recognition and rewards; coaching for success and improvement; and
							ensuring diversity awareness. Promotes and supports company
							policies, procedures, mission, values, and standards of ethics and
							integrity by training and providing direction to others in their
							use and application; ensuring compliance with them; and utilizing
							and supporting the Open Door Policy. Ensures business needs are
							being met by evaluating the ongoing effectiveness of current
							plans, programs, and initiatives; consulting with business
							partners, managers, co-workers, or other key stakeholders;
							soliciting, evaluating, and applying suggestions for improving
							efficiency and cost-effectiveness; and participating in and
							supporting community outreach events.
						</div>
					</div>
					<div className='mt-4'>
						<div className='flex items-center justify-start mt-2 '>
							<span className='font-medium italic tracking-wide'>Role :</span>&nbsp; Front-end
							Developer
						</div>
						<div className='flex items-center justify-start mt-2'>
							<span className='font-medium italic tracking-wide'>Department :</span>&nbsp;
							Engineering
						</div>
						<div className='flex items-center justify-start mt-2'>
							<span className='font-medium italic tracking-wide'>Employment Type :</span>&nbsp;
							Full Time, Permanent
						</div>
						<div className='flex items-center justify-start mt-2'>
							<span className='font-medium italic tracking-wide'>Role Category :</span>&nbsp;
							Software Development
						</div>
					</div>
					<div className='mt-2'>
						<div className='flex items-center font-medium italic justify-start mt-2 tracking-wide'>
							Education
						</div>
						<div className='flex items-center justify-start mt-1'>
							<span className='font-semibold'>UG :</span>&nbsp; Any Graduate
						</div>
						<div className='flex items-center justify-start mt-1'>
							<span className='font-semibold'>PG :</span>&nbsp; Any Graduate
						</div>
					</div>
					<div>
						<div className='font-medium italic mt-3 tracking-wide'>Required Skills</div>
						<div className='mt-1 text-color12'>
							lorem Ipsum is simply dummy text; it is simply a placeholder for
							others to connect real people with.
						</div>
					</div>
				</div>
				<div>
					<div className='h-12 bg-white rounded-2xl text-color1 px-20 font-medium text-lg flex items-center justify-center'>
						Apply
					</div>
					<div className='text-white mt-4 flex'>
						<Icon
							icon='mdi:location'
							className='pt-1 text-xl'
						/>
						<div className='pl-1'>Hyderabad</div>
					</div>
					<div className='text-white mt-4 flex'>
						<Icon
							icon='fa:suitcase'
							className='pt-1'
						/>
						<div className='pl-2'>Full Time</div>
					</div>
					<div className='text-white mt-4 flex'>
						<Icon
							icon='ri:graduation-cap-fill'
							className='pt-1 text-xl'
						/>
						<div className='pl-2'>0 - 2 yrs</div>
					</div>
					<div className='text-white mt-4 flex'>
						<Icon
							icon='ic:baseline-email'
							className='pt-1 text-xl'
						/>
						<div className='pl-2'>Posted: 30 Jul 2023</div>
					</div>
					<div className='text-white mt-4 flex'>
						<Icon
							icon='ic:baseline-email'
							className='pt-1 text-xl'
						/>
						<div className='pl-2'>Expires: 01 Aug 2023</div>
					</div>
					<div className='text-white mt-4 flex'>
						<Icon
							icon='material-symbols:share'
							className='pt-1 text-xl'
						/>
						<div className='pl-2'>
							<button onclick={copyToClip}>Share</button>
						</div>
					</div>
				</div>
			</div>
			<div className='w-3/5 h-full bg-color5 ml-10 mt-5 p-5 rounded-xl text-white'>
				<div className='w-full'>
					{/* Render the dropdown with options from the collegeList */}
					<p className='font-semibold text-lg mt-6'>
						Institute Name
					</p>
					<select
						className='my-3 w-4/6 h-12 rounded px-2'
						value={collegeName}
						onChange={(e) => setCollegeName(e.target.value)}
						style={{ color: '#838383' }}>
						<option value='' className='text-gray-800'>Choose your institute from the dropdown </option>
						{collegeList.map((college) => (
							<option
								key={college._id}
								value={college.name}>
								{college.name}
							</option>
						))}
					</select>
				</div>
				<TextInput
					label='CGPA'
					placeholder='Grade Point (Out of 10)'
					className='my-6'
					value={gradePoint}
					setValue={setGradePoint}
					type='number'
				/>
				<TextInput
					label='Google drive link for Resume '
					placeholder='Resume URL'
					className='mt-12'
					value={resumeLink}
					setValue={setResumeLink}
					type='text'
				/>
				<p className='text-xs mt-2 italic text-color6'>(* Please ensure submitting the URL after enabling sharing access to all)</p>
				<button
					className='h-12 mt-12 my-6 bg-white rounded-2xl text-color1 px-20 font-medium text-lg flex items-center justify-center'
					onClick={(e) => {
						applyPosition();
					}}>
					Apply
				</button>
			</div>
		</LoggedInContainer>
	);
};

export default Jobid;