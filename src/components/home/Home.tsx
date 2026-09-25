import { Environments } from "../../environment/environment";

const Home = () => {
  return (
    <main>
      <p>Defaul Screen</p>
      <table>
        <tbody>
          <tr>
            <td>
              <label>NODE_ENV, PORT</label>
            </td>
            <td>
              <label>{import.meta.env.MODE}, {Environments.PORT}</label>
            </td>
          </tr>
          <tr>
            <td>
              <label>current Configuration</label>
            </td>
            <td>
              <label>{Environments.currentConfiguration}</label>
            </td>
          </tr>
          <tr>
            <td>
              <label>PORT</label>
            </td>
            <td>
              <label>{Environments.PORT}</label>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};

export default Home;
