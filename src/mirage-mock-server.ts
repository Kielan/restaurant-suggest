import { Factory, Server, Model, Registry, Response } from "miragejs";
import Schema from "miragejs/orm/schema";
import * as faker from "faker";

interface ISuggestionModelProps {
    id: string;
    description: string;
    address: string;
    link: string;
}

const MirageSuggestionModel = Model.extend({
    id: '1',
    description: 'namea',
    address: '',
    link: '',
    name: 'hello',
});

const MirageSuggestionFactory = Factory.extend({
    // factory properties go here
    description(i): string {
        return `Suggestion ${i}`;
    },
    id(i): string {
        return `${i}`;
    },
    name(): string {
        return faker.company.companyName();
    },
    address(): string {
        return faker.address.streetAddress(true); 
    },
    link(): string {
        return faker.internet.url();
    }
});

type AppRegistry = Registry<
    {   /* models can be defined here */
        suggestion: typeof MirageSuggestionModel
    },
    {   /* factories can be defined here */
        suggestion: typeof MirageSuggestionFactory
    }
>;

declare const AppSchema: Schema<AppRegistry>;

export function MirageMockServer({ environment = "development" } = {}): Schema<AppRegistry> {

    const server: Server<AppRegistry> = new Server ({        
        models: {
            suggestion: MirageSuggestionModel,
        },

        factories: {
            suggestion: MirageSuggestionFactory
        },
        
        seeds(server) {
            //this.schema
            server.create("suggestion");
        },
        routes() {
            //this.passthrough() must be in routes before this.namespace
            //just because of miragejs architecture
            this.passthrough('localhost:8000/page-data/**');
            this.namespace = "api"

            function errorCatch(e: any): any {
                const headers = {'content-type': "application/javascript"};
                console.log('error catch e', e);
                return new Response(
                    500,
                    headers,
                    { message: `Error created ${e} suggestion`},
                );
            }

            this.get("/suggestions", (db, req) => {// @ts-ignore
                let data = {};
                const headers = {'content-type': "application/javascript"};
                // @ts-ignore
                data = db.suggestions.all();

                // @ts-ignore
                //console.log('/sggstion db ', data.models);
                return new Response(
                    200,
                    headers,
                    // @ts-ignore
                    data,//`{"data": ${data.models} }`,
                );
            });

            this.post('/suggestions', (schema, request) => {
                function isEmpty(obj) {
                    for(var key in obj) {
                        if(obj.hasOwnProperty(key))
                            return false;
                    }
                    return true;
                }
                  
                const headers = {};

                let attrs = JSON.parse(request.requestBody);

                try {
                    if (isEmpty(attrs)) {
                        server.create("suggestion");
                    } else {
                        server.create("suggestion", {
                            ...attrs
                        });
                    }
                } catch(e) {
                    errorCatch(e);
                }

                return new Response(
                    200,
                    headers,
                    { message: `Successfully created ${attrs.name} suggestion`},
                );
            });
        }
    });
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //server.schema///: Schema<Registry<Record<string, ModelDefinition<{}>>, Record<string, FactoryDefinition<{}>>>>,
    
    // @ts-ignore
    return server;
}

export default MirageMockServer;