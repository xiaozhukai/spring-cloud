package com.cloud.command;

import org.apache.catalina.User;
import org.springframework.web.client.RestTemplate;

import com.netflix.hystrix.HystrixCommand;

import rx.Observable;
import rx.Subscriber;

public class UserCommand extends HystrixCommand<User> {
	private RestTemplate restTemplate;
	private Long id;

	private UserCommand(Setter setter, RestTemplate restTemplate, Long id) {
		super(setter);
		this.restTemplate = restTemplate;
	}

	@Override
	protected User run() {

		return restTemplate.getForObject("http://USER-SERVICE/users/{1}", User.class, id);
	}

	public Observable<User> getUserById(final String id) {
		return Observable.create(new Observable.OnSubscribe<User>() {

			@Override
			public void call(Subscriber<? super User> observer) {
				try {
					if (!observer.isUnsubscribed()) {
						User user = restTemplate.getForObject("http://USER-SERVICE/users/{1}", User.class, id);
						observer.onNext(user);
						observer.onCompleted();
					}
				} catch (Exception e) {
					observer.onError(e);
				}
			}
		});
	}
}
