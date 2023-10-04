
// function MessageBox (props) {
//     // eslint-disable-next-l
//     const { error, setError } = props;

//     return (
//         <>
//             {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
//                 Launch demo modal
//             </button> */}

//             <div className={error ? "d-block" : "d-none"}>
//                 <div className={`modal mt-5 fade ${error ? "show" : ""}`} style={{ display: error ? "block" : "", height: '39%', zIndex: "100000" }} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                     <div className="modal-dialog">
//                         <div className="modal-content" style={{ position: 'relative' }}>
//                             <div className="modal-header">
//                                 <h5 className="modal-title text-((danger" id="exampleModalLabel">Error</h5>
//                                 <button type="button" onClick={() => setError("")} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                             </div>
//                             <div className="modal-body">
//                                 {error}
//                             </div>
//                             <div className="modal-footer">
//                                 <button type="button" onClick={() => setError("")} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="l" onClick={() => setError("")} style={{
//                     position: "fixed", transition: " all 0.4 ease-in-out", top: "0px", left: "0px", background: "#000", zIndex: "10000", width: "100%", minHeight: "100vh", opacity: "0.3"
//                 }}>

//                 </div>
//             </div>
//         </>
//     );
// }

// // export default MessageBox;
