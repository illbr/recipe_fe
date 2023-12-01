import React, { Fragment } from 'react'

export default function Alert({ type, message }) {
    return (
        <>
            <Fragment>
                <div className={`col-3 alert alert-${type || 'primary'}`} style={{
                    position: "absolute",
                    right: 0
                }} >{message}</div>
            </Fragment>
        </>
    )
}