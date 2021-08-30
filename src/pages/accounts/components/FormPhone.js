import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function FormPhone({ count = "", phone, setPhone }) {
    const mode = useSelector(state => state.mode);
    const fontSize = 24;

    // PHONE VALIDATION
    useEffect(() => {
        const formPhone1 = document.getElementById(`formPhone${count}1`);
        const formPhone2 = document.getElementById(`formPhone${count}2`);
        const formPhone3 = document.getElementById(`formPhone${count}3`);
        if (phone.a.length < 3 && phone.a.length !== 0)
            formPhone1.classList.add("border-danger");
        else if (phone.a.length === 3 && !phone.a.includes("e"))
            formPhone1.classList.replace("border-danger", "border-success");
        else
            formPhone1.classList.remove("border-danger", "border-success");

        if (phone.b.length < 3 && phone.b.length !== 0)
            formPhone2.classList.add("border-danger");
        else if (phone.b.length === 3)
            formPhone2.classList.replace("border-danger", "border-success");
        else
            formPhone2.classList.remove("border-danger", "border-success");

        if (phone.c.length < 4 && phone.c.length !== 0)
            formPhone3.classList.add("border-danger");
        else if (phone.c.length === 4)
            formPhone3.classList.replace("border-danger", "border-success");
        else
            formPhone3.classList.remove("border-danger", "border-success");
    }, [phone, count]);

    return (
        <div className="input-group mb-3 pe-2">
            <span className={ `d-flex align-items-center pe-2` } style={ { fontSize } }>(</span>
            <input id={ `formPhone${count}1` } type="number" className={ `form-control rounded text-center border-2 bg-${mode.bg} text-${mode.txt}` } value={ phone.a } onChange={ (x) => {
                if (x.target.value.length < 3)
                    setPhone({ a: x.target.value, b: phone.b, c: phone.c });
                else if (x.target.value.length === 3) {
                    setPhone({ a: x.target.value, b: phone.b, c: phone.c });
                    document.getElementById(`formPhone${count}2`).focus();
                }
            } } required />
            <span className={ `d-flex align-items-center px-2` } style={ { fontSize } }>) -</span>
            <input id={ `formPhone${count}2` } type="number" className={ `form-control rounded text-center border-2 bg-${mode.bg} text-${mode.txt}` } value={ phone.b } onChange={ (x) => {
                if (x.target.value.length < 3)
                    setPhone({ a: phone.a, b: x.target.value, c: phone.c });
                else if (x.target.value.length === 3) {
                    setPhone({ a: phone.a, b: x.target.value, c: phone.c });
                    document.getElementById(`formPhone${count}3`).focus();
                }
            } } required />
            <span className={ `d-flex align-items-center px-2` } style={ { fontSize } }>-</span>

            <input id={ `formPhone${count}3` } type="number" className={ `form-control rounded text-center border-2 bg-${mode.bg} text-${mode.txt}` } value={ phone.c } onChange={ (x) => {
                if (x.target.value.length < 4)
                    setPhone({ a: phone.a, b: phone.b, c: x.target.value });
                else if (x.target.value.length === 4) {
                    setPhone({ a: phone.a, b: phone.b, c: x.target.value });
                }
            } } required />
        </div>
    );
}