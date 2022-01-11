import styled from "styled-components";

const LoadContet = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #101111;
`;

interface Props {
  load: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Load({ load }: Props) {
  return (
    <LoadContet>
      <h1 color="#fffff">Loading...</h1>{" "}
    </LoadContet>
  );
}

export default Load;
