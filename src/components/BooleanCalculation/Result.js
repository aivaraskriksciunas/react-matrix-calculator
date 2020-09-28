import React from 'react'
import styles from './Result.module.css'

export default function BooleanResult({ truthTable }) {

    return (
        <>
            <table className={styles.table}>
                {/* Generate headers */}
                <thead>
                    <tr className={styles.headerRow}>
                        {truthTable.headers.map( h => (
                            <th key={h} className={styles.headerCell}>
                                {h}
                            </th>
                        ) )}
                    </tr>
                </thead>
                
                <tbody>
                    {truthTable.table.map( ( row, rowIndex ) => (
                        <tr key={rowIndex} className={styles.dataRow}>
                            {row.map( ( col, colIndex ) => (
                                <td key={colIndex} className={styles.dataCell}>
                                    {col}
                                </td>
                            ) )}
                        </tr>
                    ) )}
                </tbody>
            </table>
        </>
    )

}