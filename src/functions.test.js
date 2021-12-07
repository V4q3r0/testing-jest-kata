import { createEvent } from './functions'
beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2021-12-07T01:20:30Z').getTime())
});
const NUM_DAY = { 'mon': 1, 'tue': 2, 'wed': 3, 'thu': 4, 'fri': 5, 'sat': 6, 'sun': 7 };

/* Datos a evaluar */
const weekday = "mon";
const week = 1;
const openHour = 9;
const closeHour = 15;
const result = createEvent(weekday, week, openHour, closeHour);

test('Validation a event title and content basic', () => {
    /* El test fue visto en clase y entiendo que estos String nunca van a cambiar,
    en duration entiendo que es para comparar las horas de diferencia (duración) entre:
    openHour y closeHour. */
    expect(result.title).toBe("[SOFKA U] Meeting Room");
    expect(result.description).toBe("Mentoring and Practice")
    // Total de horas que dura el evento
    expect(result.duration).toEqual([(closeHour - openHour), "hour"])
    expect(result.duration).toEqual([6, "hour"])
});

test('Validation start date', () => {
    /* Este test evalua la hora de inicio del evento, pero al utilizar variables
    siempre hay una diferencia entre las horas al estar iniciada en la linea 11,
    así que la única opción que vi fue realizar una nueva hora de la misma */
    let days = (NUM_DAY[weekday] - new Date().getDay()) + 7 * (week - 1)
    expect(result.start.toUTCString()).toEqual(new Date(new Date().setDate(new Date().getDate() + days)).toUTCString())
});

test('Validation date', () => {
    /* El test evalua la fecha indicada del evento,
    donde weekday:"tue" = martes y week:"1" = semana actual
    o primera semana */
   expect(result.date).toBe("martes, 7 de diciembre de 2021")
});


test('Validation illegal arguments', () => {
    /* Con un if preguntamos por cada argumento, si es un argumento ilegal
    nos va testear el error */
    const weekday = "mon";
    const week = 1;
    const openHour = 14;
    const closeHour = 60;

    if((closeHour - openHour) < 0 || week < 0 || !Object.keys(NUM_DAY).some(key => key === weekday)){
        const error = () => {
            createEvent(weekday, week, openHour, closeHour)
        }
        expect(error).toEqual(Error)
    }

});


test('create an event list of at least 10 events', () => {
    //Creamos la lista de eventos
    const listEvent = [
        {
            weekday: "mon",
            week : 3,
            openHour : 8,
            closeHour : 15
        },
        {
            weekday: "tue",
            week : 2,
            openHour : 9,
            closeHour : 10
        },
        {
            weekday: "wed",
            week : 1,
            openHour : 10,
            closeHour : 12
        },
        {
            weekday: "thu",
            week : 1,
            openHour : 11,
            closeHour : 20
        },
        {
            weekday: "fri",
            week : 5,
            openHour : 14,
            closeHour : 22
        },
        {
            weekday: "sat",
            week : 6,
            openHour : 9,
            closeHour : 19
        },
        {
            weekday: "sun",
            week : 7,
            openHour : 13,
            closeHour : 15
        },
        {
            weekday: "mon",
            week : 6,
            openHour : 11,
            closeHour : 21
        },
        {
            weekday: "sun",
            week : 9,
            openHour : 22,
            closeHour : 23
        },
        {
            weekday: "mon",
            week : 8,
            openHour : 8,
            closeHour : 24
        }
    ]

    //La recorremos con map
    listEvent.map((event) => {
        //Utilizamos cada evento de la lista
        let result = createEvent(event.weekday, event.week, event.openHour, event.closeHour);

        //Testeamos la duracion
        expect(result.duration).toEqual([(event.closeHour - event.openHour), "hour"])
    })
});
