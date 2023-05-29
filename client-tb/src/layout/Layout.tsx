import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';


export const Layout: React.FC = () => {
	return (
		<Wrapper>
			<Outlet/>
		</Wrapper>
	);
};

const Wrapper = styled.div`
  width: 100%;
  margin: 10px auto;
  padding: 0 16px;
`;
