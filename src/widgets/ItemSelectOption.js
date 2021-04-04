


export const ItemSelectOption = ({options, label, inputRef, onChange, color, style}) =>{
    return(
        <div className="input-settings-container" style={{color:color}}>
            <div>{label}</div>
            <div className="parent-select">
                <select ref={inputRef} onChange={onChange} style={{...style,border:`1px solid ${color}`}}className="input-settings input-opt">
                    <option hidden defaultChecked>{inputRef?.current?.value}</option>
                    {
                        options?.map?.((option, key)=>(
                            <option key={key}>{option}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}