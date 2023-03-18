// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addEducation } from '../redux/actions';

// const EducationForm = () => {
//   const dispatch = useDispatch();

//   const [school, setSchool] = useState('');
//   const [degree, setDegree] = useState('');
//   const [fieldOfStudy, setFieldOfStudy] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newEducation = {
//       school,
//       degree,
//       fieldOfStudy,
//       startDate,
//       endDate,
//     };
//     dispatch(addEducation(newEducation));
//     setSchool('');
//     setDegree('');
//     setFieldOfStudy('');
//     setStartDate('');
//     setEndDate('');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="school">School/University:</label>
//         <input
//           type="text"
//           id="school"
//           value={school}
//           onChange={(e) => setSchool(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="degree">Degree:</label>
//         <input
//           type="text"
//           id="degree"
//           value={degree}
//           onChange={(e) => setDegree(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="fieldOfStudy">Field of Study:</label>
//         <input
//           type="text"
//           id="fieldOfStudy"
//           value={fieldOfStudy}
//           onChange={(e) => setFieldOfStudy(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="startDate">Start Date:</label>
//         <input
//           type="date"
//           id="startDate"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="endDate">End Date:</label>
//         <input
//           type="date"
//           id="endDate"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit">Add Education</button>
//     </form>
//   );
// };

// export default EducationForm;
