import React from 'react';
import { Redirect } from 'react-router-dom';
import { StateContext } from '../State';

const TicketTable = () => {
    const context = React.useContext(StateContext);

    var tickets;
    React.useEffect(async () => {
        var response = await fetch(
            `http://localhost:8080/tickets?userID=${context.user.id}\
                &view=${context.tickets.view}`
        );

        tickets = await response.json();
    });

    const handleTicketSelect = (event) => {
        context.setState({
            ...context,
            tickets: {
                ...context.tickets,
                selected: Number(event.currentTarget.value)
            }
        });
    }

    const changeView = () => {
        context.setState({
            ...context,
            tickets: {
                ...context.tickets,
                view: (context.tickets.view + 1) % 2
            }
        });
    }

    return (
        <table>
            <h1>Tickets</h1>
            <label>Viewing: { context.tickets.view === 0 ? 'Submitted' : 'Received' }</label>
            <button onClick={ changeView }>Toggle View</button>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Updated At</th>
            </tr>
            {
                !tickets
                ? null
                : tickets.map(ticket => {
                    return (
                        <tr key={ ticket.id } value={ ticket.id }
                            onClick={ handleTicketSelect }>
                            <td>{ ticket.id }</td>
                            <td>{ ticket.title }</td>
                            <td>{ ticket.status }</td>
                            <td>{ ticket.createdAt }</td>
                            <td>{ ticket.updatedAt }</td>
                        </tr>
                    );
                })
            }
        </table>
    );
}

export default TicketTable;
