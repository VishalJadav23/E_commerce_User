export default function Loader(props) {
    const { isLoading } = props
    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", zIndex: "1000", backgroundColor: "#fff" }}>
                <div className="spinner-border" style={{ width: "4rem", height: "4rem", color: "#FFD95A" }} role="status">
                </div>
                <br />
                <span>Loading...</span>
            </div>
        )
    }
    return "";
}