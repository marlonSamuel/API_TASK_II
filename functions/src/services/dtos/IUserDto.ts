/**
 * Interface representing the data transfer object (DTO) for a user.
 * Used to encapsulate user information.
 */
interface IUserDto {
    isNew: boolean;
    id: string;
    email: string;
}

/**
 * Interface representing the response data for user-related operations.
 * Includes user information and an authentication token.
 */
interface IUserResponse {
    user: IUserDto;
    token: string;
}

export {
    IUserDto,
    IUserResponse
};