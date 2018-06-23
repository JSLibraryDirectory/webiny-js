// eslint-disable
import React from "react";
import { app as nmApp } from "webiny-client-nm";
import { app, inject } from "webiny-client";

// TODO: register NM modules
app.modules.register({
    name: "EmailEditor",
    factory: () => import("webiny-client-nm").then(({ EmailEditor }) => EmailEditor)
});

app.modules.register([
    {
        name: "Icon",
        factory: () => import("webiny-client-ui").then(({ Icon }) => Icon)
    },
    {
        name: "Tooltip",
        factory: () => import("webiny-client-ui").then(({ Tooltip }) => Tooltip)
    },
    {
        name: "Input",
        factory: () =>
            import("webiny-client-ui/lib/Input").then(Input => {
                return inject({ modules: ["FormGroup", "Tooltip", "Icon"] })(
                    ({ modules: { Tooltip, Icon }, ...props }) => {
                        return <Input {...props} addons={{ Tooltip, Icon }} />;
                    }
                );
            })
    }
]);

app.use(nmApp());
