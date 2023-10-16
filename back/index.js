import { app } from "./src/app.js";

const port = process.env.SERVER_PORT || 5000;

app.listen(port, () => {
  console.log(`${port}에 연결되었습니다`);
});
