Phase 0:
- Signals preferred over RxJS for state
- HttpClient kept at service boundary
Phase 1:
- Services own signals
- Components consume readonly signals
- No RxJS-based state
Phase 2:
- Reactive Forms only
- Typed forms mandatory
- Form emits intent, services mutate state
