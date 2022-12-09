import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import { Link } from 'react-router-dom';
import { FcRight } from 'react-icons/fc';
import { fetchAeroplane } from '../redux/aeroplanes/aeroplanes';
import '../styles/Homepage.css';

const Aeroplanes = () => {
	const dispatch = useDispatch();
	const aeroplanes = useSelector((state) => state);
	useEffect(() => {
		if (!aeroplanes.length) {
			dispatch(fetchAeroplane());
		}
	}, [dispatch, aeroplanes]);

	const onClickHandler = (e) => {
		localStorage.clear();
		const aero = aeroplanes.find((a) => a.id === e.target.id);
		localStorage.setItem('aero', JSON.stringify(aero));
	};

	return (
		<div className="d-flex flex-column justify-content-center align-items-center home">
			<h2>Latest Models</h2>
			<p>Kindly select a plane for renting</p>
			{aeroplanes.map((a) => (
				<div key={a.id} className="aero">
					<img src={a.image} alt={a.name} width="250" height="150" />
					<p>{a.name}</p>
					<p>{a.description}</p>

					<Link to={`/Aeroplanes/${a.id}`}
					>
						<p>View Details</p>
						<FcRight id={a.id} onClick={onClickHandler} />
					</Link>

				</div>
			))}
		</div>
	);
};

export default Aeroplanes;
