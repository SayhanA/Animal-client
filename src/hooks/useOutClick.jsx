import { useEffect } from 'react';

const useOutClick = (ref, callback) => {
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				callback();
			}
		};

		/* Attach the event handler */
		document.addEventListener('mousedown', handleClickOutside);

		/* Clean up the event listener when the component unmounted */
		return () => {
			document.addEventListener('mousedown', handleClickOutside);
		};
	}, [ref, callback]);

	return <div>useOutClick</div>;
};

export default useOutClick;
