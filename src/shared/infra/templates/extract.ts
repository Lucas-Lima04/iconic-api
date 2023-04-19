import { IShift } from "@/modules/shifts/model/IShift";

function extractTemplate(shifts: IShift[]) {
return `
<!DOCTYPE html>
<html>
    <head>

    </head>
    <body>
        <h1>Extrato</h1>
        <table>
            <thead>
                <tr>
                    <th>
                        Dia
                    </th>
                    <th>
                        Hospital
                    </th>
                    <th>
                        Valor
                    </th>
                </tr>
            </thead>
            <tbody>
                ${shifts.length > 0 &&
                    shifts.map((shift) => {
                        return (
                        `<tr>
                            <td>
                               ${shift.startDate.getDate()}/${shift.startDate.getMonth() + 1}/${shift.startDate.getFullYear()}
                            </td>
                            <td>
                                Teste
                            </td>
                            <td>
                                ${shift.value}
                            </td>
                        </tr>`)
                    })}
            </tbody>

        </table>
    </body>
</html>
`
}

export default extractTemplate;