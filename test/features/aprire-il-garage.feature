# language: it

Funzionalità: Ottenere la lista dei veicoli nel garage
    Per tener traccia della manutenzione dei veicoli
    Come meccanico
    Voglio ottenere la lista veicoli

    Esempio: In passato ho registrato dei veicoli
        Dato che in passato Salvatore ha registrato i veicoli
            | nome        | targa   |                      
            | Maggiolone  | CK998BT |
            | Africa Twin | AS01916 |
        Quando Salvatore richiede la lista dei veicoli 
        Allora Salvatore riceve la seguente lista
            | nome        | targa   |                      
            | Maggiolone  | CK998BT |
            | Africa Twin | AS01916 |
