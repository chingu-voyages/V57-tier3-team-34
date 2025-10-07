// User/Auth Types
export interface User {
	id: string;
	name: string;
	email: string;
	createdAt: string;
	updatedAt: string;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterData {
	name: string;
	email: string;
	password: string;
}

export interface AuthResponse {
	user: User;
	token: string;
	message?: string;
}

// API Response wrapper
export interface ApiResponse<T = any> {
	data: T;
	message?: string;
	success?: boolean;
}

// Error Types
export interface ApiError {
	message: string;
	status?: number;
	code?: string;
}
