import React, { createContext, useState } from "react";

export const UutinenContext : React.Context<any> = createContext(undefined);

interface Props {
    children : React.ReactNode
}

export interface Uutinen {
    id : number,
    otsikko : string,
    sisalto? : string,
    julkaistu? : Date,
    kuva? : string,
    linkki? : string
}

export const UutinenProvider : React.FC<Props> = (props: Props) : React.ReactElement => {

    const [uutiset, setUutiset] = useState<Uutinen[]>([
                                                        {
                                                            id : 1,
                                                            otsikko : "Uutinen 1"
                                                        }
                                                        ,
                                                        {
                                                            id : 2,
                                                            otsikko : "Uutinen 3"
                                                        },
                                                        {
                                                            id : 3,
                                                            otsikko : "Uutinen 3"
                                                        },
                                                        {
                                                            id : 4,
                                                            otsikko : "Uutinen 4"
                                                        }
                                                    ]);

    return (
        <UutinenContext.Provider value={{ uutiset }}>
            {props.children}
        </UutinenContext.Provider>
    )

}