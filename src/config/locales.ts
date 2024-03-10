

const LOCALES = {
    es: {
        language: 'es',
        error: 'Error:',
        accept: 'Aceptar',
        cancel: 'Cancelar',
        languageSelector: 'Idioma: ',
        login: {
            emailRestriction: 'Solo puedes acceder mediante un correo de Telesonic.',
            unknownLoginError: 'Ha habido un error al iniciar sesión con la cuenta.',
            login: 'Iniciar Sesión'
        },
        home: 'Bienvenido',
        profile: {
            logout: 'Cerrar Sesión',
            confirmLogout: 'Quieres cerrar la sesión?',
        },
        tabs: ['Inicio', 'Partes', 'Datos', 'Perfil'],
        calendar: {
            monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
            monthNamesShort: ['Ene.','Feb.','Mar.','Abr.','May.','Jun.','Jul.','Ago.','Sep.','Oct.','Nov.','Dic.'],
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.']
        },
        parts: {
            hours: {
                tabName: 'horas',
                tabTitle: 'Parte de horas',
                event: 'Evento: ',
                date: 'Fecha: ',
                sesion: 'Sesión de trabajo ',
                start: 'Hora inicio',
                end: 'Hora final',
                save: 'Guardar',
                total: 'Horas Totales: ',
                total15: 'Horas (x1.5): ',
                total15Desc: 'Este valor representa las horas totales teniendo en cuenta que las horas de los domingos, las horas de antes de las 9:00 y las horas de despues de las 21:00 cuentan por 1.5',
                saveFeedback: 'Cambios guardados correctamente'
            },
            expenses: {
                tabName: 'gastos',
                tabTitle: ''
            },
            incidents: {
                tabName: 'incidencias',
                tabTitle: ''
            }
        }

    },
    eus: {
        language: 'eus',
        error: 'Errorea:',
        accept: 'Onartu',
        cancel: 'Ezeztatu',
        languageSelector: 'Hizkuntza: ',
        login: {
            emailRestriction: 'Bakarrik Telesonic-eko posta elektroniko baten bidez sar zaitezke.',
            unknownLoginError: 'Errore bat gertatu da kontuan sartzerakoan. Saiatu geroago.',
            login: 'Hasi Saioa'
        },
        home: 'Ongi etorri',
        profile: {
            logout: 'Irten Kontutik',
            confirmLogout: 'Kontutik irten nahi duzu?',
        },
        tabs: ['Hasiera', 'Parteak', 'Datuak', 'Kontua'],
        calendar: {
            monthNames: ['Urtarrilla','Otsaila','Martxoa','Apirila','Maiatza','Ekaina','Uztaila','Abuztua','Iraila','Urria','Azaroa','Abendua'],
            monthNamesShort: ['Urt.','Ots.','Mar.','Api.','Mai.','Eka.','Uzt.','Abu.','Ira.','Urr.','Aza.','Abe.'],
            dayNames: ['Igandea', 'Astelehena', 'Asteartea', 'Asteazkena', 'Osteguna', 'Ostirala', 'Larunbata'],
            dayNamesShort: ['Ig.', 'Al.', 'As.', 'Az.', 'Og.', 'Or.', 'Ig.']
        },
        parts: {
            hours: {
                tabName: 'orduak',
                tabTitle: 'Orduen partea',
                event: 'Emanaldia: ',
                date: 'Data: ',
                sesion: 'Lan-saioa ',
                start: 'Hasiera ordua',
                end: 'Amaiera ordua',
                save: 'Gorde',
                total: 'Orduak Guztira: ',
                total15: 'Orduak (x1.5): ',
                total15Desc: 'Balio honek, igandeetako orduak, 9:00 aurreko orduak eta 21:00 ondorengo orduak bider 1.5 balio dutela kontuan izanda, lan ordu kopuru totala adierazten du.',
                saveFeedback: 'Aldaketak behar bezala gorde dira'
            },
            expenses: {
                tabName: 'gastuak',
                tabTitle: ''
            },
            incidents: {
                tabName: 'gorabeherak',
                tabTitle: ''
            }
        }
    }
}

export default LOCALES;