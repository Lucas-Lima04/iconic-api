
import { app } from ".";
import { context } from "./shared/infra/database/Context";

app.listen(process.env.PORT ?? 3333, () =>
    console.log(`Server is running at ${process.env.PORT}!`)
).on("close", () => {
    context.prisma.$disconnect();
    console.log("Prisma was disconnected");
});
