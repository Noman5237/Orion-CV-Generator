// import { useDrag } from 'react-dnd';


// interface SidebarItemProps {
//   type: string;
//   label: string;
// }

// const SidebarItem: React.FC<SidebarItemProps> = ({ type, label }) => {
//   const [{ isDragging }, drag] = useDrag({
//     item: { type },
//     collect: (monitor) => ({
//       isDragging: !! monitor.isDragging(),
//     }),
//   });

//   return (
//     <div
//       ref={drag}
//       style={{
//         opacity: isDragging ? 0.5 : 1,
//         cursor: 'move',
//         padding: '10px',
//         marginBottom: '10px',
//         backgroundColor: 'white',
//         border: '1px solid gray',
//       }}
//     >
//       {label}
//     </div>
//   );
// };

// const Sidebar: React.FC = () => {
//   return (
//     <div style={{ width: '200px', height: '100%', padding: '20px' }}>
//       <SidebarItem type="Text" label="Text Box" />
//       <SidebarItem type="List" label="List" />
//     </div>
//   );
// };

// export default Sidebar;
