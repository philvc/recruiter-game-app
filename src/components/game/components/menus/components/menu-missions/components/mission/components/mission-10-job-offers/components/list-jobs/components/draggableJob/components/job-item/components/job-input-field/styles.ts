import styled from 'styled-components'

export const StyledTenJobsInput: any = styled.input`
    cursor ${(props: any) => props.isApplicant ? 'copy' : 'text'};
    width: 200px;
    outline: none;
`