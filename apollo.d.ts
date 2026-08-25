import "@apollo/client";

declare module "@apollo/client" {
    namespace ApolloClient {
        namespace DeclareDefaultOptions {
            interface WatchQuery {
                errorPolicy: "none";
            }
            interface Query {
                errorPolicy: "none";
            }
        }
    }
}
