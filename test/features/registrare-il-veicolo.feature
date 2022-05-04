# language: it

Funzionalità: Registrare un nuovo veicolo
    Per tener traccia della manutenzione dei veicoli
    Come meccanico
    Voglio registrare un nuovo veicolo in Aladino

    Esempio: Registro un veicolo in Aladino
        Dato che in passato Salvatore ha registrato i veicoli
            | name        | plate   |                      
            | Africa Twin | AS01916 |
        Quando Salvatore registra il veicolo Maggiolone con targa CK998BT 
        Allora Salvatore riceve la seguente lista
            | name        | plate   |   
            | Africa Twin | AS01916 |
            | Maggiolone  | CK998BT |

    Esempio: Un veicolo con la stessa targa è già registrato in Aladino
        Dato che in passato Salvatore ha registrato i veicoli
            | name        | plate   |                      
            | Africa Twin | AS01916 |
        Quando Salvatore registra il veicolo Africa Twin con targa AS01916 
        Allora la registrazione fallisce