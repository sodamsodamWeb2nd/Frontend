export default function Button({ title, children }) {
    return (
        <div className="card">
            <div className="card__header">{title}</div>
            <div className="card__body">
                {children}
            </div>
        </div>
    );
}

